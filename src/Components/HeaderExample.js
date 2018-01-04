import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeaderExample = () => (
  <Header as='h1' color='green'>
    <Icon name='world' color='blue'/>
    <Header.Content>
      Master of Fluency
    </Header.Content>
  </Header>
)

export default HeaderExample
