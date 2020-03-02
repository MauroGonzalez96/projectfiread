import React, {useState} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
    margin: 15,
};

const Login = () => {
    const [nameuser, guardarName] = useState('')
    const [passworduser, guardarPassword] = useState('')

    const handleClick = (e)=> {
        var apiBaseUrl = "http://localhost:4000/api/";
        var self = this;
        var payload={
        "email":nameuser,
        "password":passworduser
        }
        axios.post(apiBaseUrl+'login', payload)
        .then(function (response) {
        console.log(response);
        if(response.data.code == 200){
        console.log("Login successfull");
        var uploadScreen=[];
        uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
        else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        }

    return ( 
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title = "Login"
                    />
                    <TextField
                        hintText="Ingresa tu Username"
                        floatingLabelText="Username"
                        onChange={e => guardarName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Ingresa tu password"
                        floatingLabelText="Password"
                        onChange={e => guardarPassword(e.target.value)}
                    />
                    <br/>
                    <RaisedButton
                        label="Submit"
                        primary={true}
                        style={style}
                        onClick={e => this.handleClick(e)}
                    />
                </div>
            </MuiThemeProvider>
        </div>
     );
}
 
export default Login;
