import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WhiteCross(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M1.533 16.467a1.627 1.627 0 002.3 0L9 11.299l5.168 5.168a1.626 1.626 0 002.299-2.3L11.299 9l5.168-5.168a1.626 1.626 0 00-2.3-2.299L9 6.701 3.832 1.533a1.626 1.626 0 10-2.299 2.3L6.701 9l-5.168 5.168a1.624 1.624 0 000 2.299z"
        fill="#fff"
      />
    </Svg>
  )
}

export default WhiteCross
