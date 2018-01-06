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

  onDateChange = (selectedDate) => {
    this.setState({
      selectedDate,
    })
  }

  onChangeText = (title) => {
    this.setState({title})
  }

  onCountdownCreate = () => {
    const {onCountdownCreate, onCreate} = this.props
    const {title, selectedDate} = this.state
    // TODO handle missing title input
    onCountdownCreate(title, selectedDate)
    onCreate()
    this.setState(Create.getInitialState())
  }

  render () {
    const {title, selectedDate} = this.state
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleLabel}>
            Was muss du erledigen?
          </Text>
          <TextInput
            autoCorrect={false}
            allowFontScaling={false}
            autoFocus
            style={styles.titleInput}
            onChangeText={this.onChangeText}
            value={title}
          />
        </View>
        <View>
          <Text style={styles.titleLabel}>
            Bis wann musst du es erledigt haben?
          </Text>
          <DatePickerIOS
            mode={'date'}
            date={selectedDate}
            minimumDate={new Date()}
            onDateChange={this.onDateChange}
          />
        </View>
        <Button
          onPress={this.onCountdownCreate}
          title="Neue Deadline Erstellen"
          color="#000"
        />
      </View>
    )
  }
}

const
  styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
      display: 'flex',
      padding: 16,
      justifyContent: 'space-around',
      height: '100%'
    },
    title: {
      fontSize: 34,
      fontWeight: '900',
      textAlign: 'center',
      color: '#424242',
    },
    titleInput: {
      fontSize: 34,
      fontFamily: 'Avenir',
      color: '#424242',
    },
    titleLabel: {
      fontWeight: '900',
      fontSize: 16,
      fontFamily: 'Avenir',
      color: '#424242',
    },

  })

Create.propTypes = {}
Create.defaultProps = {}
export default connect(null, {onCountdownCreate: addCountdown})(Create)