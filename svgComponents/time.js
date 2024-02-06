import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Time(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <Path
        d="M10.375 6.625A4.377 4.377 0 016 11a4.377 4.377 0 01-4.375-4.375A4.377 4.377 0 016 2.25a4.377 4.377 0 014.375 4.375zM6 4v2.5"
        stroke="#0D101C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.5 1h3"
        stroke="#0D101C"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Time
