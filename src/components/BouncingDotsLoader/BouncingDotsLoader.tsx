import './BouncingDotsLoader.scss';

export const BouncingDotsLoader = ({ testId }: { testId?: string }) => (
  <div data-testid={`${testId}loader`} className="bouncing-loader">
    <div />
    <div />
    <div />
  </div>
);
