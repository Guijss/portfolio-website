import { motion } from 'framer-motion';

function Logo(props) {
  return (
    <motion.svg
      width={50}
      height={50}
      viewBox="0 0 13.229166 13.229167"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      whileHover={{
        rotate: 360,
        scale: 1.1,
      }}
      transition={{ type: 'spring', stiffness: 600, damping: 70, mass: 5 }}
    >
      <g
        fill="none"
        stroke="#8c9bd2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="none"
        strokeOpacity={1}
        paintOrder="stroke markers fill"
      >
        <motion.path
          d="M8.809 10.16H3.512L.864 5.575 3.512.987h5.297l2.648 4.587z"
          transform="matrix(.88043 .50832 -.50816 .88017 4.023 -1.423)"
          fillOpacity={1}
          strokeWidth={1.30147}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, transition: { duration: 1 } }}
        />
        <motion.path
          d="M9.435 6.61l-2.172.005m2.172-.004l-.002 1.653v0L6.61 9.922l-2.818-1.65.004-3.307 2.823-1.658 2.819 1.65"
          strokeWidth={1.32291}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, transition: { duration: 2 } }}
        />
      </g>
    </motion.svg>
  );
}

export default Logo;
