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
            </a>{' '}
            |{' '}
            <a href="https://github.com/fabianamasini" target="_blank">
              Fabiana
            </a>{' '}
            |{' '}
            <a href="https://github.com/Guilherme-pdz" target="_blank">
              Guilherme
            </a>{' '}
            @ 2022
          </p>
        </div>
      </footer>
    )
  }
}
