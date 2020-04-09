/**
 * This should be removed once added upstream:
 * https://github.com/TylerBarnes/gatsby-plugin-transition-link/pull/202
 */

declare module "gatsby-plygin-transition-link/AniLink" {
	import { Component } from "react";

	interface AniLinkFade {
		fade: boolean;
	}
	type AniLinkPaintDripColors =
		| {
				color?: string;
		  }
		| {
				hex?: string;
		  };
	type AniLinkPaintDrip = AniLinkPaintDripColors & {
		paintDrip: boolean;
	};
	interface AniLinkSwipe {
		swipe: boolean;
	}
	interface AniLinkCover {
		cover: boolean;
		bg?: string;
	}
	type AniLinkTypes =
		| AniLinkFade
		| AniLinkPaintDrip
		| AniLinkSwipe
		| AniLinkCover;

	interface AniLinkProps {
		to: string;
		direction?: string;
		duration?: number;
		top?: "exit" | "entry";
		entryOffset?: number;
	}
	const AniLink: Component<AniLinkProps & AniLinkTypes>;
	export default AniLink;
}

declare module "gatsby-plugin-transition-link" {
	import { GatsbyLinkProps as GatsbyLinkPropsGeneric } from "gatsby";
	import { NavigateOptions } from "@reach/router";
	import { RefObject } from "react";

	type GatsbyLinkProps = GatsbyLinkPropsGeneric<any>;

	interface TransitionHandlerProps {
		injectPageProps?: boolean;
	}

	const TransitionHandler: React.Component<TransitionHandlerProps>;

	export type TransitionStatuses =
		| "entering"
		| "entered"
		| "exiting"
		| "exited";

	interface TransitionStateProps {
		children: ({
			mount,
			transitionStatus
		}: {
			mount: boolean;
			transitionStatus: TransitionStatuses;
		}) => React.ReactNode;
	}

	const TransitionState: React.Component<TransitionStateProps>;

	type TransitionPortalLevels = "top" | "bottom" | "middle";

	interface TransitionPortalProps {
		level?: TransitionPortalLevels;
	}

	const TransitionPortal: React.Component<TransitionPortalProps>;

	interface InternalContext<State = any> {
		inTransition: boolean;
		disableAnimation: boolean;
		e: false | Event;
		exitDelay: number;
		exitLength: number;
		exitState: State;
		exitTrigger: false | ExitEntryTriggerFn<State>;
		exitProps: any;
		entryDelay: number;
		entryLength: number;
		entryState: State;
		entryProps: any;
		entryTrigger: false | ExitEntryTriggerFn<State>;
		updateContext: (obj: Partial<InternalContext<State>>) => void;
	}

	interface TransitionObserverProps {
		forceRender?: boolean;
		children: (
			contextState: InternalContext,
			innerRef: RefObject<unknown>
		) => React.ReactNode;
	}

	const TransitionObserver: React.Component<TransitionObserverProps>;

	interface TriggerFnProps<State> {
		node: HTMLElement;
		e: Event;
		entry: EntryExit<State>;
		exit: EntryExit<State>;
	}

	type ExitEntryTriggerFn<State = object> = ({
		exit,
		node
	}: TriggerFnProps<State>) => void;

	interface EntryExit<State = object> {
		state?: State;
		appearAfter?: number;
		length?: number;
		zIndex?: number;
		delay?: number;
		activeClass?: string;
		className?: string;
		trigger: ExitEntryTriggerFn<State>;
	}

	interface TriggerPages<State> {
		entry: Promise<EntryExit<State>>;
		exit: Promise<EntryExit<State>>;
	}

	interface UseTriggerTransitionOptions<State = any, LinkState = any> {
		event?: Event;
		to?: string;
		disableAnimation?: boolean;
		replace?: NavigateOptions<LinkState>["replace"];
		linkState?: NavigateOptions<LinkState>["state"];
		exit?: EntryExit<State>;
		entry?: EntryExit<State>;
		inTransition?: boolean;
		pages?: TriggerPages<State>;
		trigger?: ExitEntryTriggerFn<State>;
		preventScrollJump?: boolean;
	}

	type programmaticallyTriggerTransition<State, LinkState> = (
		calledOptions?: Event | UseTriggerTransitionOptions<State, LinkState>
	) => void;
	const useTriggerTransition: <State, LinkState>(
		defaultOptions: UseTriggerTransitionOptions<State, LinkState>
	) => programmaticallyTriggerTransition<State, LinkState>;

	interface TransitionLinkProps<State = any>
		extends Omit<GatsbyLinkProps, "onClick" | "innerRef"> {
		exit: EntryExit<State>;
		entry: EntryExit<State>;
		state?: State;
		replace?: NavigateOptions<any>["replace"];
		preventScrollJump?: boolean;
		trigger?: (pages: TriggerPages<State>) => void;
		exitLength?: number;
		entryDelay?: number;
		exitFn?: Function;
		entryState?: object;
		to: GatsbyLinkProps["to"];
		className?: GatsbyLinkProps["className"];
		activeStyle?: GatsbyLinkProps["activeStyle"];
		style?: GatsbyLinkProps["style"];
		activeClassName?: GatsbyLinkProps["activeClassName"];
		partiallyActive?: GatsbyLinkProps["partiallyActive"];
		onClick?: (
			event: Parameters<GatsbyLinkProps["onClick"]>[0],
			weShouldNavigate: boolean
		) => void;
		innerRef?: GatsbyLinkProps["ref"];
		ref?: GatsbyLinkProps["ref"];
	}

	const TransitionLink: React.Component<TransitionLinkProps>;

	export {
		TransitionHandler,
		TransitionState,
		TransitionPortal,
		TransitionObserver,
		useTriggerTransition
	};

	export default TransitionLink;
}
