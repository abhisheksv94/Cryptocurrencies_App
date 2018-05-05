import React,{Component} from 'react';
import {View,Text,StyleSheet,Button,ActivityIndicator,ScrollView} from 'react-native';

//Provides more details about the coin selected and also provides a 24 hour price graph

//Props: Name: Name of cryptocurrency, Short: symbol of the cryptocurrency


const Header=(props)=><Text>{props.title}</Text>//style the header
export default class DetailsPage extends Component{
    state={
        name:this.props.navigation.state.params.name,
        loading:false,
        data:{}
    }
    
    static navigationOptions=function({navigation}){
        return{
            title:navigation.state.params.name,
        }
    }
    //fetches details of the coin selected
    componentDidMount(){
        this.setState({loading:true});
        fetch('http://coincap.io/page/'+this.props.navigation.state.params.short)
            .then(res=>res.json())
            .then(data=>this.setState({data:data,loading:false}))
            .catch(error=>console.log(error.message));
    }
    //function to navigate to the graph page showing 
    //the 24 hour price graph
    showGraphPage=()=>{
        this.props.navigation.navigate('Graph',{
           name:this.props.navigation.state.params.short,
        })
    }
    render(){
        //console.log(this.state.data);
        //variable to hold the details of the coin
        let showDetails=<Text>No Details yet!</Text>;const data=this.state.data;
        if(Object.keys(data).length>0){
            const availability=data['status'];
            const fontColor=availability==='available'?'#00ff00':'red';
            showDetails=<ScrollView>
                <Text style={styles.textStyle}>Name: <Text style={styles.innerTextStyle}>{data["display_name"]}</Text></Text>
                <Text style={styles.textStyle}>Symbol: <Text style={styles.innerTextStyle}>{data["id"]}</Text></Text>
                <Text style={styles.textStyle}>Market Cap: <Text style={styles.innerTextStyle}>{data['market_cap']}</Text></Text>
                <Text style={styles.textStyle}>Status: <Text style={{color:fontColor}}>{availability}</Text></Text>
                <Text style={styles.textStyle}>Price USD: <Text style={styles.innerTextStyle}>{data['price_usd']}{' '}$</Text></Text>
                <Text style={styles.textStyle}>Price EUR: <Text style={styles.innerTextStyle}>{data['price_eur']}{' '}€</Text></Text>
                <Text style={styles.textStyle}>Bit Nodes Count: <Text style={styles.innerTextStyle}>{data['bitnodesCount']}</Text></Text>
                <Text style={styles.textStyle}>24hour VWAP: <Text style={styles.innerTextStyle}>{data['vwap_h24']}</Text></Text>
                <Text style={styles.textStyle}>Supply: <Text style={styles.innerTextStyle}>{data['supply']}</Text></Text>
                <Text style={styles.textStyle}>24hour Volume: <Text style={styles.innerTextStyle}>{data['volume']}</Text></Text>
                <Text style={styles.textStyle}>%24hr: <Text style={styles.innerTextStyle}>{data['cap24hrChange']}</Text></Text>
            </ScrollView>
        }
        return(
            <View style={{backgroundColor:'black',height:'100%'}}>
                
                <View style={{marginBottom:10,marginTop:20,width:'50%'}}>
                    <Button  title="Show Price Graph" onPress={this.showGraphPage}/>
                </View>
                {showDetails}
                <ActivityIndicator animating={this.state.loading} size='large'/>
            </View>
        )
    }
}

styles=StyleSheet.create({
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
        color:'gray',
        paddingTop:20,
        marginStart:20,
    },
    innerTextStyle:{
        color:'aquamarine',
    }
})