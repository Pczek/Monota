import React from 'react'
import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { Button, DatePickerIOS, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { addCountdown } from '../actions/index'

class Create extends Component {

  constructor () {
    super()
    this.state = Create.getInitialState()
  }

  static getInitialState () {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return {
      selectedDate: tomorrow,
      title: ''
    }
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    if (prevProps.currentSlide !== this.props.currentSlide && this.props.currentSlide === 'CREATE' && this.state.title === '') {
      this.input.focus()
    } else if (this.props.currentSlide !== 'CREATE') {
      this.input.blur()
    }
  }

  onKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      this.input.blur()
    }
  }

  onDateChange = (selectedDate) => {
    this.setState({
      selectedDate,
    })
  }

  onChangeText = (title) => {
    this.setState({title})
  }

  onCountdownCreate = () => {
    const {title} = this.state
    if (title !== '') {
      const {selectedDate} = this.state
      const {onCountdownCreate, onCreate} = this.props
      onCountdownCreate(title, selectedDate)
      onCreate()
      this.setState(Create.getInitialState())
    }
  }

  render () {
    const {title, selectedDate} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.question}>
            Was möchtest du erledigen?
          </Text>
          <View style={styles.titleContainer}>
            <TextInput
              ref={input => this.input = input}
              selectionColor={'#FC5C63'}
              onKeyPress={this.onKeyPress}
              multiline
              blurOnSubmit
              numberOfLines={8}
              autoCorrect
              allowFontScaling={false}
              returnKeyType={'done'}
              enablesReturnKeyAutomatically
              style={styles.titleInput}
              onChangeText={this.onChangeText}
              value={title}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.question}>
            Bis wann willst du es erledigt haben?
          </Text>
          <DatePickerIOS
            mode={'date'}
            date={selectedDate}
            minimumDate={new Date()}
            onDateChange={this.onDateChange}
          />
          <Button
            disabled={title.trim() === ''}
            onPress={this.onCountdownCreate}
            title='Neue Deadline Erstellen'
            color='#FC5C63'
          />
        </View>

      </View>
    )
  }
}

const
  styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 16,
      height: '100%'
    },
    top: {
      flex: 4,
    },
    bottom: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 34,
      fontWeight: '900',
      color: '#424242',
    },
    titleContainer: {
      borderLeftWidth: 2,
      borderColor: '#FC5C63',
      paddingLeft: 16,
    },
    titleInput: {
      fontSize: 34,
      fontFamily: 'Avenir',
      color: '#424242',
    },
    question: {
      fontSize: 16,
      fontFamily: 'Avenir',
      color: '#424242',
    },
    button: {
      fontFamily: 'Avenir',
      color: '#424242',
    }

  })

Create.propTypes = {}
Create.defaultProps = {}
const mapStateToProps = (state) => ({currentSlide: state.slide})
export default connect(mapStateToProps, {onCountdownCreate: addCountdown})(Create)
