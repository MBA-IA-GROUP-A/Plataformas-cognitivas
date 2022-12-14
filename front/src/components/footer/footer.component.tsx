import React from 'react'
import './footer.component.scoped.scss'

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container">
          <p>
            Criado por{' '}
            <a href="https://github.com/vinimarcili" target="_blank">
              Viní Marcili
            </a>
          </p>
        </div>
      </footer>
    )
  }
}
