import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

class InputItem extends React.Component {
  
  state = {
    inputValue: '',
    error: false,
    errorMessage: '',
    buttonColor: 'default',
  }

  render() {

    const { addTask } = this.props;

    return (
      <form
        autoComplete='off'
        style={ {display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'} }
        onSubmit={ evt => {
          evt.preventDefault();

          if (this.state.inputValue === '') {
            this.setState({errorMessage: 'Укажите задачу', error: true, buttonColor: 'secondary'})
          } else {
            this.setState({errorMessage: '', error: false, buttonColor: 'default'});
            addTask(this.state.inputValue);
            this.setState({inputValue: ''})
          }
        } }
      >
        <TextField
          id='standard-basic'
          label='Новая задача:'
          size='small'
          helperText={this.state.errorMessage}
          style={ {width: '75%'} }
          error={this.state.error}
          value={this.state.inputValue}
          onChange={evt => this.setState({
            inputValue: evt.target.value,
            errorMessage: '',
            error: false,
            buttonColor: 'primary',
          })}
          />

        <Button
          type='submit'
          variant='contained'
          color={this.state.buttonColor}
          endIcon={
            <Send
              style={ { fontSize: '25px'} }
            >
            </Send>} 
          style={ {width: '20%', padding: '0 5px', height: '48px'} }
        ></Button>
      </form>
    );
  }
}

export default InputItem
