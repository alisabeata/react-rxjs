import React, { useEffect, useState, useRef } from 'react'
import { fromEvent } from 'rxjs'
import {
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const SearchComponent = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    // RxJS stream from input events
    const input$ = fromEvent(inputRef.current, 'input').pipe(
      map((event) => event.target.value), // Extract the text from the input
      debounceTime(500), // Debounce the input by 500ms
      distinctUntilChanged(), // Only emit when the current value is different from the last
      switchMap((searchTerm) => {
        if (searchTerm.trim() === '') {
          return [] // Return an empty array (or an empty observable) if the input is empty
        } else {
          setLoading(true)
          return ajax(
            `https://api.github.com/search/users?q=${searchTerm}`,
          ).pipe(map((response) => response.response.items))
        }
      }),
    )

    const subscription = input$.subscribe((users) => {
      setLoading(false)
      setResults(users)
    })

    return () => subscription.unsubscribe() // Cleanup subscription
  }, [])

  return (
    <div>
      <input ref={inputRef} placeholder="Search GitHub users" />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchComponent
