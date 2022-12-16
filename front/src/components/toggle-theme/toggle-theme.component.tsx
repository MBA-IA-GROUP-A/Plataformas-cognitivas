import SelectorComponent from '@components/selector/selector.component'
import localForageHelper from '@helpers/localforage.helper'
import { useCallback, useEffect, useState } from 'react'
import './toggle-theme.component.scss'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  labelPosition?: 'left' | 'right' | 'none'
  fontSize?: string
}

export default ({ labelPosition = 'left', className = '', fontSize = '1rem' }: Props) => {
  const [checked, setChecked] = useState(window.matchMedia('(prefers-color-scheme:dark)').matches)

  const handleChange = useCallback(
    async (thisCheck: boolean) => {
      document.body.classList.value = `scrollbar ${thisCheck ? 'dark' : 'light'}`
      await localForageHelper.setItem('theme', thisCheck ? 'dark' : 'light')
      setChecked(thisCheck)
    },
    [setChecked]
  )

  useEffect(() => {
    localForageHelper.getItem('theme').then((theme: any) => {
      if (theme) {
        handleChange(theme === 'dark')
      }
    })
  }, [handleChange])

  return (
    <SelectorComponent
      className={'theme-selector ' + className}
      errorSpan={false}
      checked={checked}
      onChange={(c: boolean) => handleChange(c)}
      toggle
      name="hub-select-theme"
      id="hub-select-theme"
      labelFontSize={fontSize}
      title="Modo Noturno"
      rightLabel={labelPosition === 'right' ? checked ? <i className="fa-solid fa-moon" /> : <i className="fa-solid fa-sun" /> : null}
      leftLabel={labelPosition === 'left' ? checked ? <i className="fa-solid fa-moon" /> : <i className="fa-solid fa-sun" /> : null}
    />
  )
}
