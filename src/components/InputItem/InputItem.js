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
    isFocused: false,
  }

  throwErr = (message) => {
    this.setState({errorMessage: message, error: true, buttonColor: 'secondary'})
  }

  render() {

    const { addTask, currentTasks } = this.props;

    return (
      <form
        autoComplete='off'
        style={ {display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'} }
        onSubmit={ evt => {
          evt.preventDefault();

          let isTaskExist = false;

          currentTasks.forEach( (task) => {
            if (this.state.inputValue === task.value) {
              isTaskExist = true;
            }
          });
          
          if (this.state.inputValue === '') { 
            this.throwErr('Укажите задачу')
          } else if (isTaskExist) {
            this.throwErr('Такая задача уже существует')
          } else {
            addTask(this.state.inputValue);
            this.setState({errorMessage: '', error: false, buttonColor: 'default', inputValue: '', isFocused: false})
          }
        }}
        onMouseLeave={ () => {
          if (this.state.error) {
            this.setState({errorMessage: '', error: false, buttonColor: 'default', inputValue: '', isFocused: false})
          } else {
            this.setState({errorMessage: '', error: false, isFocused: false})
          }
        }
        }
      >
        <TextField
          id='outlined-basic'
          label='Новая задача:'
          size='small'
          helperText={this.state.errorMessage}
          style={ {width: '75%'} }
          error={this.state.error}
          value={this.state.inputValue}
          focused={this.state.isFocused}
          onClick={ () => {
            this.setState({isFocused: true})
          }}
          onChange={evt => {
            (evt.target.value) && this.setState({
              inputValue: evt.target.value,
              errorMessage: '',
              error: false,
              buttonColor: 'primary',
              isFocused: true,
            });
            (!evt.target.value) && this.setState({
              inputValue: evt.target.value,
              errorMessage: '',
              error: false,
              buttonColor: 'default',
              isFocused: true,
            })
          }
        }
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
