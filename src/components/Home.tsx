{/* Update the Join Waitlist buttons in the Coming Soon section */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="pt-4"
>
  <Link 
    to={`/waitlist?service=${service.id}`}
    className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto transition-colors"
  >
    Join Waitlist
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      →
    </motion.div>
  </Link>
</motion.div>