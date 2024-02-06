import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Lock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <Path
        d="M15 21.25a2.5 2.5 0 01-2.5-2.5c0-1.387 1.113-2.5 2.5-2.5a2.5 2.5 0 010 5zM22.5 25V12.5h-15V25h15zm0-15a2.5 2.5 0 012.5 2.5V25a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 015 25V12.5C5 11.113 6.112 10 7.5 10h1.25V7.5a6.25 6.25 0 0112.5 0V10h1.25zM15 3.75a3.75 3.75 0 00-3.75 3.75V10h7.5V7.5A3.75 3.75 0 0015 3.75z"
        fill="#471AA0"
      />
    </Svg>
  )
}

export default Lock
