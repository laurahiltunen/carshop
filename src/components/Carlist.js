import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table'; //ReactTable asennettu tähän projektiin yarnin avulla
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button'; //Haettu Material-Ui -sivuilta. Nappi vaidetaan muuttamalla <button> --> <Button>
import Snackbar from '@material-ui/core/Snackbar'; //Haettu Material-Ui -sivuilta
import Addcar from './Addcar'; //Tuodaan Addcar
import Editcar from './Editcar';

export default function Carlist() {

    const [cars, setCars] = useState([]);   //Luodaan cars-array, jota voi päivittää setCars-komennolla. 
                                            //useState asettaa luotuun array:n tyhjäksi (siihen voisi laittaa esim jonkin arvon tai arvoja valmiiksi)
    const [open, setOpen] = React.useState(false); //snackbar ks. deleteCar
    
    useEffect(() => fetchData(), []);       //Ensimmäisen renderöinnin yhteydessä kutsutaan fetchData-funktiota ja käyttäjälle näkyy kaikkien autojen listaus 

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars') //Haetaan data valmiista REST API:sta
        .then(response => response.json())              //Suodatetaan datasta vain json
        .then(data => setCars(data._embedded.cars))      //Tallennetaan json-datasta cars-niminen lista cars-arrayhyn 
    }

    const deleteCar = (link) => {                       //Auton tiedot pistava funktio, joka saa parametrinä linkin
        if(window.confirm('Haluatko varmasti poistaa auton?')) {
            fetch(link, {method:'DELETE'})                  //Haetaan linkin data ja määritellään metodiksi delete (oletusmetodi on GET)
            .then(res => fetchData())                       //Haetaan postamisen jälkeen data uudestaan sivulle
            .catch(err => console.error(err))

            setOpen(true);                                  //avaa snackbar-ikkunan
        }
    }
    const handleClose = (event, reason) => {                //sulkee snacbar-ikkunan
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const saveCar = (car) => { //Tallennetaan käyttäjän syöttämä auto tietokantaan
        fetch('https://carstockrest.herokuapp.com/cars', {
            method:'POST',
            headers: {
                'Content-Type':'application/json' //tämä tieto löytyy tehtävän mukana tulleesta REST-dokumentista
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData()) //haetaan kaikki autot uudestaan
        .catch(err => console.error(err)) //tulostetaan virheet konsoliin
    };

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))

    };
    
                                  

    const columns = [                                   //Määritellään taulukon otsikkorivin otsikot (Header) ja mistä niihin kuuluvat tiedot jöytyvät json-muotoisesta datasta (accessor)
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {   //Add -nappi
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcar updateCar ={updateCar} car={row.original}/> //lähetetään updateCar propseina ja valitun rivin auton tiedot

        },
        {   //Delete-nappi
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href', //Linkki auton tietoihin
            Cell: row => <Button color='secondary' size='small' onClick={() => deleteCar(row.value)}>Delete</Button> //Käytetään ReactTablen ominaisuutta row, joka ohjaa toiminnon (delete) taulukon riville
        }
    ]

    return(
        <div>
            <Addcar saveCar = {saveCar}/> 
            <ReactTable data={cars} columns={columns} filterable={true} /> 
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}} 
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Auto on nyt poistettu"
            />
        </div>
    );//Renderöidään nettisivulle näkyviin cars-array, joka näytetään ReactTablessa columns avulla
}
