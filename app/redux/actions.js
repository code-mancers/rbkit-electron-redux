export const CONNECTED = 'CONNECTED';
export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';
export const DISCONNECTED = 'DISCONNECTED';
export const CONNECT = 'CONNECT';
export const COMMAND = 'COMMAND';

export function connectToServer() {
  return {
    type: CONNECT,
    sock: {}
  };
}

export function disconnectFromServer() {
  return {
    type: 'DISCONNECT',
    sock: {}
  };
}

export function handshake() {
  return {
    type: COMMAND,
    sock: {
      cmd: 'handshake'
    }
  };
}

export function startCpuProfiling() {
  return {
    type: COMMAND,
    sock: {
      cmd: 'start_cpu_profiling'
    }
  };
}

export function stopCpuProfiling() {
  return {
    type: COMMAND,
    sock: {
      cmd: 'stop_cpu_profiling'
    }
  };
}

export function updateCPUProfilingTable(cpuProfilingTable) {
  return {
    type: 'UPDATE_CPU_PROFILING_TABLE',
    data: cpuProfilingTable
  };
}
