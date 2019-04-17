import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
const styles = () => ({root: {color: 'red', backgroundColor: '#F1EDDC'}})

class Navbar extends React.Component {
  render() {
    const {isLoggedIn, handleClick} = this.props
    console.log(this)
    return (
      <div className="header-nav">
        <nav>
          {isLoggedIn ? (
            <div>
              <AppBar position="static">
                <ToolBar className={this.props.classes.root}>
                  <Typography
                    variant="title"
                    // background-color={this.props.classes.root.color}
                  >
                    {/* The navbar will show these links after you log in */}
                    <Button component={Link} to="/products">
                      Store
                    </Button>
                    <Button>
                      <a href="#" onClick={handleClick}>
                        Logout
                      </a>
                    </Button>
                    <Button component={Link} to="/addproduct">
                      Add Product
                    </Button>
                    <Button component={Link} to="/cart">
                      Cart
                    </Button>
                    <Button component={Link} to="/checkOrder">
                      Order History
                    </Button>
                  </Typography>
                </ToolBar>
              </AppBar>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <AppBar position="static">
                <ToolBar>
                  <Typography variant="title" color="inherit">
                    <Button component={Link} to="/products">
                      Store
                    </Button>
                    <Button component={Link} to="/login">
                      Login
                    </Button>
                    <Button component={Link} to="/signup">
                      Sign Up
                    </Button>
                    <Button component={Link} to="/cart">
                      Cart
                    </Button>
                    <Button component={Link} to="/checkOrder">
                      Order History
                    </Button>
                  </Typography>
                </ToolBar>
              </AppBar>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div className="header-nav">
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {console.log('this is this', this)}
//           <AppBar position="static">
//             <ToolBar>
//               <Typography variant="title" color="inherit">
//                 {/* The navbar will show these links after you log in */}
//                 <Button component={Link} to="/products">
//                   Store
//                 </Button>
//                 <Button>
//                   <a href="#" onClick={handleClick}>
//                     Logout
//                   </a>
//                 </Button>
//                 <Button component={Link} to="/addproduct">
//                   Add Product
//                 </Button>
//                 <Button component={Link} to="/cart">
//                   Cart
//                 </Button>
//                 <Button component={Link} to="/checkOrder">
//                   Order History
//                 </Button>
//               </Typography>
//             </ToolBar>
//           </AppBar>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           {console.log('this is this', this)}
//           <AppBar position="static">
//             <ToolBar>
//               <Typography variant="title" color="inherit">
//                 <Button component={Link} to="/products">
//                   Store
//                 </Button>
//                 <Button component={Link} to="/login">
//                   Login
//                 </Button>
//                 <Button component={Link} to="/signup">
//                   Sign Up
//                 </Button>
//                 <Button component={Link} to="/cart">
//                   Cart
//                 </Button>
//                 <Button component={Link} to="/checkOrder">
//                   Order History
//                 </Button>
//               </Typography>
//             </ToolBar>
//           </AppBar>
//         </div>
//       )}
//     </nav>
//     {/* <hr /> */}
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  console.log('hjello')
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

const styledNavbar = withStyles(styles)(Navbar)
export default connect(
  mapState,
  mapDispatch
)(styledNavbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
