import React, { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

const InputsComponent = () => {
  const input1Ref = useRef(null)
  const input2Ref = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    // Make sure all inputs are present
    if (input1Ref.current && input2Ref.current && outputRef.current) {
      const input1$ = fromEvent(input1Ref.current, 'input').pipe(
        map((event) => event.target.value), // Mapping to extract the value
      )

      const input2$ = fromEvent(input2Ref.current, 'input').pipe(
        map((event) => event.target.value), // Mapping to extract the value
      )

      const combinedInputs$ = input1$.pipe(
        mergeMap((value1) =>
          input2$.pipe(map((value2) => `${value1} and ${value2}`)),
        ),
      )

      const subscription = combinedInputs$.subscribe((combinedValue) => {
        outputRef.current.textContent = `Input 1 and Input 2 are: ${combinedValue}`
      })

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe()
      }
    }
  }, []) // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <input ref={input1Ref} type="text" placeholder="Input 1" />
      <input ref={input2Ref} type="text" placeholder="Input 2" />
      <div ref={outputRef}>Type in both inputs...</div>
    </div>
  )
}

export default InputsComponent
