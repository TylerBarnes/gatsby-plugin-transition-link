import * as React from 'react';
import {Link, GatsbyLinkProps as GatsbyLinkPropsGeneric} from "gatsby";

type GatsbyLinkProps = GatsbyLinkPropsGeneric<any>;

declare const TransitionHandler;

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

declare const TransitionObserver;
declare const useTriggerTransition;

interface EntryExit {
    state?: object;
    appearAfter?: number;
    length?: number;
    zIndex?: number;
    delay?: number;
    activeClass?: string;
    className?: string;
    // Unknown
    trigger: ({exit, node}: any) => void;
}
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
