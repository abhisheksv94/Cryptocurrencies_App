import React,{Component} from 'react';
import {View,Text,TouchableHighlight} from 'react-native';

//simple component to provide a style to list items of the Listing Page
//also provides navigate options to provide more details of the coin selected

/*Props: Name: name of cryptocurrency, Short: symbol of the currency, 
    Index: index of the currency in the list of the Listing Page
*/
const NavigateToggler=(props)=>{
    return(
        <TouchableHighlight 
        onPress={()=>props.navigation.navigate('Details',{
            name:props.name,short:props.short
        })} 
        style={{
            backgroundColor:'white',
            padding:10,
            width:"100%",
        }}>
            <Text 
            style={{color:'#4c8eff',alignSelf:'flex-start',fontSize:20,fontWeight:'bold',padding:10}}
            >   {props.index+1}{'. '}{props.name}</Text>
        </TouchableHighlight>
        
    );
}

export default NavigateToggler;

