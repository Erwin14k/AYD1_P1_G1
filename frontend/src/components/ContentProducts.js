import React from 'react';
import { Paper, TextField, Typography,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel } from '@mui/material';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';

const cardData = [
   { id: 1, title: 'Tarjeta 1' },
   { id: 2, title: 'Tarjeta 2' },
   { id: 3, title: 'Tarjeta 3' },
   { id: 1, title: 'Tarjeta 1' },
   { id: 2, title: 'Tarjeta 2' },
   { id: 3, title: 'Tarjeta 3' },
   { id: 1, title: 'Tarjeta 1' },
   { id: 2, title: 'Tarjeta 2' },
   { id: 3, title: 'Tarjeta 3' },
   { id: 1, title: 'Tarjeta 1' },
   { id: 2, title: 'Tarjeta 2' },
   { id: 3, title: 'Tarjeta 3' },
   { id: 1, title: 'Tarjeta 1' },
   { id: 2, title: 'Tarjeta 2' },
   { id: 3, title: 'Tarjeta 3' },
   { id: 1, title: 'Tarjeta 1' },
   { id: 2, title: 'Tarjeta 2' },
   { id: 3, title: 'Tarjeta 3' },
   // Agrega más tarjetas según tus necesidades
 ];

 
const ContentProducts = () => {


   return (
      <>
         <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Productos recientes
         </Typography>

         <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Combos recientes
         </Typography>

         <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Explorar por categoría
         </Typography>
         <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
         {cardData.map((card) => (
            <Card key={card.id} style={{ display: 'inline-block', margin: '0 8px' }}>
               <Typography variant="body1" component="div">
               {card.title}
               </Typography>
            </Card>
         ))}
         </div>
     

         <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Producto cerca de ti
         </Typography>

         <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Combos cerca de ti
         </Typography>
      </>
   );
};

export default ContentProducts;
