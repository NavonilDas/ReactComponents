import React from 'react';
import './NavBar.css';


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



