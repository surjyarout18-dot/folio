'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <>
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[140] origin-top bg-orange"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  )
}
