import React, { ComponentType, Dispatch, useContext } from 'react';
import { shallowEqual } from 'react-redux';
import { ActionCreatorFactory } from '../../PageConfigs/constants';
import { ActionContext } from '../../Providers/ActionProvider/ActionProvider';
import { Location, NavigateFunction, Params, PathMatch, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HydrateContext } from '~/src/Providers/HydrateProvider/HydrateProvider';

interface ActionsWrapperProps {
  actionCreatorFactory: ActionCreatorFactory;
  children: React.ReactNode;
  dispatch: Dispatch<any>;
  router: {
    location: Location<any>;
    navigate: NavigateFunction;
    params: Params<string>;
    match: PathMatch<string> | null;
  };
  isHydrated: boolean;
}
interface Props {
  actionCreatorFactory: ActionCreatorFactory;
  children: React.ReactNode;
}

function withRouter(Component: ComponentType<ActionsWrapperProps>) {
  function ComponentWithRouterProp(props: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const match = useMatch(location.pathname);

    const isHydrated = useContext(HydrateContext);

    return (
      <Component
        {...props}
        dispatch={dispatch}
        isHydrated={isHydrated}
        router={{ location, navigate, params, match, }}
      />
    );
  }

  return ComponentWithRouterProp;
}
class ActionsWrapper extends React.Component<ActionsWrapperProps> {
  constructor(props: ActionsWrapperProps, context: { setActions: (action: any) => void }) {
    super(props, context);
    if (SERVER_BUILD) {
      const actions = this.props.actionCreatorFactory?.(
        { isServer: true },
        this.props.router.location,
        this.props.router.match,
      ).filter((a) => a);

      if (actions?.length) {
        (this.context as any).setActions?.(actions);
      }
    }
  }
  componentDidMount() {
    this.dispatchAction('mount', true);

  }

  shouldComponentUpdate(nextProps: ActionsWrapperProps) {
    return (!shallowEqual(this.props.router.location.search, nextProps.router.location.search)
      || !shallowEqual(this.props.router.match?.params, nextProps.router.match?.params)
      || this.props.router.match?.pathname !== nextProps.router.match?.pathname
    )
  }

  componentDidUpdate() {
    this.dispatchAction('update', true, true);
  }

  dispatchAction(condition: 'mount' | 'server' | 'update', isMount?: boolean, isUpdate?: boolean) {
    const actions = this.props.actionCreatorFactory?.(
      { isServer: SERVER_BUILD, isMount, isHydrated: this.props.isHydrated, isUpdate },
      this.props.router.location,
      this.props.router.match,
    )

    if (actions?.length) {
      actions.forEach((action) => {
        if (typeof action === 'object') {
          if (DEV) {
            console.log(condition, action.type);
          }
          this.props.dispatch(action);
        }
      });
    }
  }

  static contextType = ActionContext;
  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}


export default withRouter(ActionsWrapper);
