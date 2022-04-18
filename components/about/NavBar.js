import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="font-semibold">
      <div className="flex flex-wrap justify-center py-12">
        {[
          ['HOME', '/'],
          ['SIGNUP', '/signup'],
          ['SIGNIN', '/signin'],
        ].map(([name, path]) => (
          <Link href={path} key={name}>
            <a className="mx-2 tracking-wider opacity-50 hover:opacity-100 duration-500 md:mx-10">{name}</a>
          </Link>
        ))}
        <a
          href="https://github.com/NotFound441/docker-NextonRails"
          className="mx-2 tracking-wider opacity-50 hover:opacity-100 duration-500 md:mx-10"
          target="_blank"
          rel="noopener noreferrer"
        >
          CODE
        </a>
      </div>
    </div>
  )
}

export default NavBar
