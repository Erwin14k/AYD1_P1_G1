import React from 'react';
import { Paper, TextField, Typography,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel } from '@mui/material';

const Filter = ({value,setValue,setName}) => {

   const handleChange = (event) => {
      setValue(event.target.value);
      if(event.target.value === "1" || event.target.value === "2" || event.target.value === "0")
         setName('');

      // console.log(event.target.value);
   };

   return (
      <Paper elevation={3} style={{ marginLeft: "2%", marginRight: "2%", marginTop: "80%", }}>
         <center>
            <Typography variant="h6" component="div" >
               Filtro de Busqueda
            </Typography>
         </center>
         <br />
         <FormControl style={{ marginLeft: "5%" }}>
            <FormLabel id="demo-radio-buttons-group-label">Filtrar por:</FormLabel>

            <RadioGroup
               aria-labelledby="demo-radio-buttons-group-label"
               defaultValue="5"
               name="radio-buttons-group"
               value={value}
               onChange={handleChange}
            >
               
               <FormControlLabel value="1" control={<Radio />} label="Productos" />
               <FormControlLabel value="2" control={<Radio />} label="Combos" />
               <FormControlLabel value="3" control={<Radio />} label="Nombre de Producto" />
               <FormControlLabel value="4" control={<Radio />} label="Nombre de Combo" />
               <FormControlLabel value="5" control={<Radio />} label="Todos" />
            </RadioGroup>
         </FormControl>

         <br />
         {value === "3" || value === "4" ?
            <>
               <TextField
                  id="standard-basic"
                  label="Nombre:"
                  variant="standard"
                  style={{ marginLeft: "3%", width: "93%" }}
                  onChange={(e) => setName(e.target.value)}
               />
               <br />
            </>
            :
            <></>
            }

         <br />
         <center>
            {/* <Button
               variant="outlined"
               onClick={handleAplicar}
            >
               Aplicar
            </Button> */}
         </center>
        
      </Paper>
   );
};

export default Filter;
