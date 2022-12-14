import ToggleThemeComponent from '@components/toggle-theme/toggle-theme.component'
import React from 'react'
import './header.component.scoped.scss'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <h1>Análise de crédito</h1>
          <ToggleThemeComponent />
        </div>
      </header>
    )
  }
}
