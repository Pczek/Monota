import React from 'react'
import { PropTypes } from 'prop-types'
import { PixelRatio, StyleSheet, Text, View, Button } from 'react-native'
import LocalizedStrings from 'react-native-localization'
import EmojiMessage from './EmojiMessage'

const strings = new LocalizedStrings({
  en: {
    allDone: 'You are all done, sit back and relax!',
    createNewTask: 'I still got stuff to do...',
  },
  de: {
    allDone: 'Alles erledigt. Chill!',
    createNewTask: 'Ich hab noch was zu tun...',
  }
})

const emojis = ['🏝', '😎', '🍻', '🎉', '🙌', '👏', '🤷', '💆']

const AllDone = ({onCreateCountdown}) => {

  return (
    <EmojiMessage
      style={styles.container}
      emojis={emojis}
      text={strings.allDone}
      buttonLabel={strings.createNewTask}
      buttonFunc={onCreateCountdown}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AllDone
