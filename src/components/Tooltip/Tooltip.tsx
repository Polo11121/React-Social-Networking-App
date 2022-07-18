import ReactTooltip, { Effect, Offset, Place, Type } from 'react-tooltip';

export type TooltipType = {
  text?: string;
  id: string;
  event?: string;
  eventOff?: string;
  multiline?: boolean;
  effect?: Effect;
  place?: Place;
  type?: Type;
  offset?: Offset;
  isDisabled?: boolean;
};

export const Tooltip = ({
  text,
  event,
  eventOff,
  offset,
  id,
  isDisabled = false,
  multiline = false,
  effect = 'solid',
  place = 'bottom',
  type = 'info',
}: TooltipType) =>
  isDisabled ? null : (
    <ReactTooltip
      disable={isDisabled}
      eventOff={eventOff}
      event={event}
      offset={offset}
      id={id}
      place={place}
      multiline={multiline}
      type={type}
      effect={effect}
    >
      {text}
    </ReactTooltip>
  );
