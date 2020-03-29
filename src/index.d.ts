import * as React from 'react';
import {GatsbyLinkProps as GatsbyLinkPropsGeneric} from "gatsby";
import {NavigateOptions} from "@reach/router";
import {RefObject} from "react";

type GatsbyLinkProps = GatsbyLinkPropsGeneric<any>;

interface TransitionHandlerProps {
    injectPageProps?: boolean;
    children?: unknown;
}
declare const TransitionHandler: React.Component<TransitionHandlerProps>;

type TransitionStatuses = 'entering' | 'entered' | 'exiting' | 'exited';

interface TransitionStateProps {
    children: ({mount, transitionStatus}: { mount: boolean, transitionStatus: TransitionStatuses }) => React.ReactNode;
}
declare const TransitionState: React.Component<TransitionStateProps>;

type TransitionPortalLevels = 'top' | 'bottom' | 'middle';

interface TransitionPortalProps {
    level?: TransitionPortalLevels
}
declare const TransitionPortal: React.Component<TransitionPortalProps>;

interface TransitionObserverProps {
    forceRender?: boolean;
    children: (contextState: unknown, innerRef: RefObject<unknown>) => React.ReactNode;
}

declare const TransitionObserver: React.Component<TransitionObserverProps>;

// Unknown
type TriggerFn = ({exit, node}: any) => void;

interface EntryExit {
    state?: object;
    appearAfter?: number;
    length?: number;
    zIndex?: number;
    delay?: number;
    activeClass?: string;
    className?: string;
    trigger: TriggerFn
}

interface UseTriggerTransitionOptions {
    event: Event;
    to: string;
    disableAnimation?: boolean;
    replace?: NavigateOptions<any>['replace'];
    linkState?: NavigateOptions<any>['state'];
    exit?: EntryExit;
    entry?: EntryExit;
    inTransition?: boolean;
    pages?: unknown;
    trigger?: TriggerFn;
    updateContext?: unknown;
    preventScrollJump?: unknown;
}
type programmaticallyTriggerTransition = (calledOptions?: Event | UseTriggerTransitionOptions) => void;
declare const useTriggerTransition: (defaultOptions: UseTriggerTransitionOptions) => programmaticallyTriggerTransition;

interface TransitionLinkProps extends Omit<GatsbyLinkProps, 'onClick' | 'innerRef' | 'replace'> {
    exit: EntryExit,
    entry: EntryExit,
    state?: unknown,
    replace?: unknown,
    preventScrollJump?: unknown,
    // Unknown
    trigger?: ({ node, e, exit, entry }: any) => void;
    exitLength?: number;
    entryDelay?: number;
    exitFn?: Function;
    entryState?: object;
    to: GatsbyLinkProps['to'];
    className?: GatsbyLinkProps['className'];
    activeStyle?: GatsbyLinkProps['activeStyle'];
    style?: GatsbyLinkProps['style'];
    activeClassName?: GatsbyLinkProps['activeClassName'];
    partiallyActive?: GatsbyLinkProps['partiallyActive'];
    onClick?: (event: Parameters<GatsbyLinkProps['onClick']>[0], weShouldNavigate: boolean) => void;
    innerRef?: GatsbyLinkProps['ref'],
    ref?: GatsbyLinkProps['ref']
}
declare const TransitionLink: React.Component<TransitionLinkProps>;

export {
    TransitionHandler,
    TransitionState,
    TransitionPortal,
    TransitionObserver,
    useTriggerTransition,
}

export default TransitionLink;
