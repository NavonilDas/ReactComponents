import React from 'react';
import './NavBar.css';

import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { CSSTransition } from 'react-transition-group';


interface NavBarProps {
    height?: number,
    bg?: string;
    borderColor?: string;
    logoSection?: JSX.Element;
    middleSection: JSX.Element;
};

export class NavBar extends React.Component<NavBarProps> {
    public static defaultProps: Partial<NavBarProps> = {
        height: 60,
        bg: "#242526",
        borderColor: "#474a4d"
    };

    render() {
        return (
            <nav className="navbar"
                style={{
                    height: this.props.height,
                    backgroundColor: this.props.bg,
                    borderBottom: `1px solid ${this.props.borderColor}`
                }}
            >
                <div>
                    {this.props.logoSection || ''}
                </div>

                <div style={{ flexGrow: 1 }}>
                    {this.props.middleSection || ''}
                </div>

                <ul>
                    {this.props.children}
                </ul>

            </nav>
        );
    }
}


interface NavItemProps {
    icon: string | JSX.Element;
    href?: string | undefined;
    onClick?: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined,

};

interface NavItemState {
    open: boolean;
};

export class NavItem extends React.Component<NavItemProps, NavItemState> {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {

        return (
            <li className="navitem">
                <a
                    href={this.props.href}
                    onClick={(event) => {
                        this.setState({ open: !this.state.open });
                        if (this.props.onClick) {
                            this.props.onClick(event);
                        }
                    }}
                >
                    {this.props.icon}
                </a>
                {this.state.open && this.props.children}
            </li>
        );
    }
}



interface DropDownProps {

};

interface DropDownState {
    activeMenu: string;
    height: number | string;
};

export class DropDown extends React.Component<DropDownProps, DropDownState> {

    public test: React.RefObject<HTMLDivElement>;

    constructor(props: DropDownProps) {
        super(props);
        this.state = {
            activeMenu: 'main',
            height: 'auto'
        };

        this.test = React.createRef();
        this.calcHeight = this.calcHeight.bind(this);
    }

    calcHeight(el: any) {
        const height = el.offsetHeight;
        this.setState({ height });
    }

    componentDidMount() {
        if (this.test.current && window) {
            const height = window
                .getComputedStyle(this.test.current, null)
                .getPropertyValue('height');
            this.setState({ height });
        }
    }

    render() {
        const activeMenu = this.state.activeMenu;
        return (
            <div className="navbar-dropdown" style={{ height: this.state.height }} ref={this.test}>

                <CSSTransition
                    in={activeMenu === 'main'}
                    unmountOnExit
                    timeout={500}
                    classNames="navbar-drop-menu"
                    onEnter={this.calcHeight}
                >
                    <div className="drop-menu-con">

                        <DropDownMenuItem>My Profile</DropDownMenuItem>
                        <DropDownMenuItem
                            leftIcon={<SettingsIcon />}
                            rightIcon={<ArrowForwardIosIcon />}
                            onClick={() => this.setState({ activeMenu: 'settings' })}
                        >
                            Settings
                        </DropDownMenuItem>
                    </div>

                </CSSTransition>

                <CSSTransition
                    in={activeMenu === 'settings'}
                    unmountOnExit
                    timeout={500}
                    classNames="navbar-drop-menu-sec"
                    onEnter={this.calcHeight}
                >
                    <div className="drop-menu-con">
                        <DropDownMenuItem leftIcon={<ArrowBackIcon />} onClick={() => this.setState({ activeMenu: 'main' })}></DropDownMenuItem>
                        <DropDownMenuItem>Test A</DropDownMenuItem>
                        <DropDownMenuItem>Test B</DropDownMenuItem>
                        <DropDownMenuItem>Test B</DropDownMenuItem>
                        <DropDownMenuItem>Test B</DropDownMenuItem>
                        <DropDownMenuItem>Test B</DropDownMenuItem>
                        <DropDownMenuItem>Test B</DropDownMenuItem>
                        <DropDownMenuItem>Test B</DropDownMenuItem>
                    </div>

                </CSSTransition>

            </div>
        );
    }
}


interface DropDownMenuProps {
    href?: string | undefined;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    onClick?: () => void;
};

interface DropDownMenuState {

};

class DropDownMenuItem extends React.Component<DropDownMenuProps, DropDownMenuState> {

    constructor(props: DropDownMenuProps) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <a href={this.props.href} className="navbar-menu-item" onClick={this.props.onClick}>
                <span>{this.props.leftIcon}</span>
                <span style={{ flexGrow: 1, margin: "0 16px 0 16px" }}>
                    {this.props.children}
                </span>
                <span>{this.props.rightIcon}</span>
            </a>
        );
    }
}
