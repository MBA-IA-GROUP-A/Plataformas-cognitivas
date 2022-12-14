import React, { useEffect, useState } from 'react'
import './selector.component.scoped.scss'

interface SelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'checkbox' | 'radio'
  style?: any
  name?: string
  id?: string
  value?: any
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  toggle?: boolean
  rightLabel?: any
  leftLabel?: any
  externalError?: any
  errorIcon?: any
  errorSpan?: boolean
  hideInput?: boolean
  labelFontSize?: string
  wrapperClass?: string
  boxBgSecondary?: boolean
  onChange?: (event: any) => any
  onEmitValue?: (value: any) => any
  onValidate?: (event: any) => any
}

interface SelectorState {
  checked: boolean
  error: string
  value: any
}

export default ({
  type = 'checkbox',
  name,
  id,
  value = '',
  checked = false,
  disabled,
  readOnly,
  required,
  toggle,
  rightLabel,
  leftLabel,
  externalError,
  errorIcon = <i className="fa-regular fa-exclamation-triangle" />,
  errorSpan = true,
  onChange,
  onEmitValue,
  onValidate,
  className = '',
  wrapperClass = '',
  labelFontSize = '1rem',
  title = '',
  style,
}: SelectorProps) => {
  const timestamp = `random-id-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`
  const [state, setState] = useState<SelectorState>({
    value: value,
    error: '',
    checked: false,
  })

  useEffect(() => {
    if (state.value !== value) {
      setState({ ...state, value })
    }
    if (state.checked !== checked) {
      setState({ ...state, checked })
    }
  }, [value, checked, state])

  const handleChange = (event: any) => {
    state.checked = event?.target?.checked || false
    if (externalError) {
      state.error = ''
    } else if (!!required && !state.checked) {
      state.error = 'Campo obrigatório'
    } else {
      state.error = ''
    }
    setState({ ...state })
    if (onValidate && typeof onValidate === 'function') {
      onValidate(!state.error && !externalError)
    }
    if (onEmitValue && typeof onEmitValue === 'function') {
      onEmitValue(state.value)
    }
    if (onChange && typeof onChange === 'function') {
      onChange(state.checked)
    }
  }

  return (
    <div className={`selector ${className}`} title={title}>
      <div
        className={
          'wrapper-selectors ' +
          `${checked ? 'checked ' : ''}` +
          `${state.error ? 'error ' : ''}` +
          `${toggle ? 'toggle ' : ''} ${wrapperClass}`
        }
      >
        {leftLabel ? (
          <label
            className={'mr-2 label ' + `${readOnly ? 'readonly ' : ''}` + `${externalError || state.error ? 'error ' : ''}`}
            htmlFor={id || timestamp}
            style={{ fontSize: labelFontSize }}
          >
            {leftLabel}
          </label>
        ) : null}
        <input
          id={id || timestamp}
          name={name || timestamp}
          type={type}
          onChange={handleChange}
          required={required}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          checked={checked}
          value={value}
          style={{ ...style }}
        />
        <label
          htmlFor={id || timestamp}
          className={`checkbox ${type} ` + `${disabled ? 'disabled ' : ''}` + `${readOnly ? 'readonly ' : ''}`}
        ></label>
        {rightLabel ? (
          <label
            className={'label ' + `${readOnly ? 'readonly ' : ''}` + `${externalError || state.error ? 'error ' : ''}`}
            htmlFor={id || timestamp}
            style={{ fontSize: labelFontSize }}
          >
            {rightLabel}
          </label>
        ) : null}
      </div>
      {errorSpan ? (
        <div className={'box-validation box-invalid show'}>
          {state.error || externalError ? errorIcon || <i className="fa-regular fa-exclamation-triangle" /> : null}
          {externalError ? externalError : ''}
          {state.error && !externalError ? state.error : ''}
        </div>
      ) : null}
    </div>
  )
}
