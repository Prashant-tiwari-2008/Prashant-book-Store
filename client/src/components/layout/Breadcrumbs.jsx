import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import leftArrowWhite  from './../../assets/images/left-arrow-white.svg'
import leftArrowDark  from './../../assets/images/left-arrow-dark.svg'

const Breadcrumbs = () => {
  const location = useLocation();

  // Splite the pathname into an Array of path segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ul>
        <li className='inline'>
          {/* todo : image chagne as per theme change */}
          <Link to="/"><img src={leftArrowWhite} alt='leftArray' className='mr-5 inline'/>Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          // Generate a cumulative path for each breadcrumb link
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

          // Format each breadcrumb segment
          const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={index}>
              <Link to={path}>{formattedSegment}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumbs