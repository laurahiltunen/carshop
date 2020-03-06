import React from 'react';
import Button from '@material-ui/core/Button'; //kopioitu Material-Ui -sivuilta
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Tämä on kopio Addcar.js tiedostosta ja sitä on muokattu editoinnin tarpeisiin
//Material-Ui -sivustolta käytetään Form dialogs -komponenttia ja koodi kopioitu sivuilta ja muokattu omaan tarpeeseen sopivaksi
export default function Editcar(props) {
    const [open, setOpen] = React.useState(false); 
    const [car, setCar] = React.useState({ 
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });

    const handleClickOpen = () => { 
        setCar({brand: props.car.brand, model: props.car.model, color: props.car.color, fuel: props.car.fuel, year: props.car.year, price: props.car.price});
        setOpen(true);
    };

    const handleClose = () => { 
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    };
    
    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href); //tallennetaan auto Carlistin saveCar-funktiolla ja lähetetään auton tiedot sinne
        handleClose(); //suljetaan form dialogs
    };

    

    return(
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus //tähän kenttään autofocus, muihin ei
                        margin="dense"
                        name="brand"     
                        value={car.brand}
                        onChange={e => handleInputChange(e)} // e (eli event) parametrina --> saadaan käytäjän kirjoittama tieto talteen
                        label="Brand"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="model"     
                        value={car.model}
                        onChange={e => handleInputChange(e)} 
                        label="Model"
                        fullWidth
                    />
                     <TextField
                        margin="dense"
                        name="color"     
                        value={car.color}
                        onChange={e => handleInputChange(e)} 
                        label="Color"
                        fullWidth
                    />
                     <TextField
                        margin="dense"
                        name="year"     
                        value={car.year}
                        onChange={e => handleInputChange(e)} 
                        label="Year"
                        fullWidth
                    />
                     <TextField
                        margin="dense"
                        name="fuel"     
                        value={car.fuel}
                        onChange={e => handleInputChange(e)} 
                        label="Fuel"
                        fullWidth
                    />
                     <TextField
                        margin="dense"
                        name="price"     
                        value={car.price}
                        onChange={e => handleInputChange(e)} 
                        label="Price"
                        fullWidth
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCar} color="primary">
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}