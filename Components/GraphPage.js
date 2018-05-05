import React, { Component } from 'react';
import { StyleSheet,  Text,  View,ActivityIndicator} from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

//component to show the 24 hour price graph

//Props: Name: symbol of the cryptocurrency
export default class GraphPage extends Component{
    state={
        history:[],
        loading:false,
    }
    static navigationOptions=()=>{
        return{
            title:"24hr Price Graph"
        }
    }
    //function to get the data for the graph
    renderData=()=>{
        
        let data=[];
        const len=this.state.history.length;
        const today=new Date();
        for(let i=0;i<len;i++){
            const val=this.state.history[i];
            data.push(val[1]);
        }
        return data;
    }
    //fetches the 24 hour price values of the cryptocurrency
    componentDidMount(){
        this.setState({loading:true});
        const api='http://coincap.io/history/1day/'
        fetch(api+this.props.navigation.state.params.name)
        .then(response=>response.json())
        .then(data=>this.setState({history:data['price'],loading:false},this.renderData))
        .catch(error=>console.log(error.message));
    }
    //shows the graph
    render(){
        const data = this.renderData();
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
        // All react-native-svg-charts components support full flexbox and therefore all
        // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
        // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
        // and then displace the other axis with just as many pixels. Simple but manual.

        return (
            <View>
                <View style={{paddingTop:20,justifyContent:'center',alignSelf:'center'}}>
                    <ActivityIndicator size='large' animating={this.state.loading}/>
                </View>
                <View style={{ 
                    height: 400,flexDirection: 'row' ,marginEnd:20,marginStart:5,
                    marginTop:50,
                }}>
                    <YAxis
                        data={data}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                    />
                    <View style={{ flex: 1,}}>
                        <LineChart
                            animate={true}
                            animationDuration={500}
                            style={{ flex: 1 }}
                            data={data}
                            contentInset={verticalContentInset}
                            svg={{ stroke: 'rgb(134, 65, 244)' }}
                        >
                            <Grid/>
                        </LineChart>
                        
                        
                    </View>
                    
                </View>
                
            </View>
        )
    
    }
}