export interface CombinedOutputExecResult {
  /** Buffered standard out and standard error outputs combined */
  output: string;
  /** This is usually a string containing an exit code if non-zero exit */
  exitError: string | null;
}

export interface SeparatedOutputExecResult {
  /** Buffered standard out output */
  output: string;
  /** Buffered standard error output */
  error: string;
  /** This is usually a string containing an exit code if non-zero exit */
  exitError: string | null;
}

export interface BaseExecOptions {
  /** whether to keep standard out and standard error outputs separate */
  separateStdErr?: boolean;
  /** arguments for the command, can be an array of arguments, or a string interpreted by bash */
  args: string | Array<string>;
  /** any environment variables to add to the execution context */
  env?: Record<string, string>;
}

export interface CombinedOutputExecOptions extends BaseExecOptions {
  separateStdErr?: false;
  /** output of the command will have standard out and standard error combined */
  onOutput?: OutputStrCallback;
}

export interface SeparatedOutputExecOptions extends BaseExecOptions {
  separateStdErr: true;
  /** output of the command on standard out */
  onStdOutOutput?: OutputStrCallback;
  /** output of the command on standard error */
  onStdErrOutput?: OutputStrCallback;
}

export type OutputStrCallback = (output: string) => void;