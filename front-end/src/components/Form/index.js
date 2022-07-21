import React from 'react'

export default ({
    register,
    errors,
    setValue,
    validation,
    children,
  }) => {
    return (
      <>
        {(Array.isArray(children) ? [...children] : [children]).map(child => {
          return child.props.name
            ? React.createElement(child.type, {
              ...{
                ...child.props,
                ref: () => {
                  register(
                    { name: child.props.name },
                    validation[child.props.name]
                  )
                },
                onChangeText: (v) =>
                  setValue(child.props.name, v, true),
                key: child.props.name,
                error: errors[child.props.name],
              },
            })
          : child
        })}
      </>
    )
  }