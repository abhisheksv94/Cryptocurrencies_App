import React,{Component} from 'react';
import {View,Text,FlatList,ActivityIndicator,Button} from 'react-native';
import NavigateToggler from './navigateToggler';

//Component to list  top ten crypotocurrencies
export default class ListingPage extends Component{
    state={
        data:[],
        loading:false,
    }
    static navigationOptions=(navigate)=>{
        return{
            title:"List of Top Ten Cryptocurrencies"
        }
    }
    componentDidMount(){
        this.refreshData();
    }
    refreshData=()=>{
        //obtains data from coincap.io
        this.setState({loading:true,data:[]});
        fetch("http://coincap.io/front")
            .then((response)=>response.json())
            .then((data)=>this.setState({data:data,loading:false},()=>console.log("\nDONE\n")))
            .catch(error=>console.log(error.message));
    }
    //function to provide separators between list data items
    renderSeparator=()=>(
        <View style={{
            alignSelf:'center',
            backgroundColor:'gray',
            height:5,
            
        }}/>
    );
    render(){
        //function returns a list of cryptocurrencies with support for refreshing the 
        //data list by pulling down on the list
        const data=null;
        if(this.state.data.length>=10)
            data=this.state.data.slice(0,10);
        else
            data=this.state.data;
        const loadingData='Loading...';
        return(
            <View style={{marginBottom:50}}>
                <FlatList style={{marginTop:10}}
                    ListHeaderComponent={()=><Text style={{color:'#007849',margin:10,fontSize:30,fontWeight:'bold',fontStyle:'italic'}}>
                        Cryptocurrencies:
                        </Text>}
                    ListEmptyComponent={()=><Text style={{color:'black',margin:30,fontSize:20,alignSelf:'center'}}>{loadingData}</Text>}
                    data={data.map((val,idx)=>{
                        return{
                            value:val,
                            key:idx.toString(),
                        }
                    })}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item,index,separators})=>{
                        return(
                            <NavigateToggler navigation={this.props.navigation}
                                separators={separators}
                                index={index} name={item.value['long']} short={item.value['short']}/>
                        );
                    }}
                    refreshing={this.state.loading}
                    onRefresh={this.refreshData}/>
                    
                    
            </View>
        )
    }
}