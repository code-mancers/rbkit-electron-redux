export const CONNECTED = 'CONNECTED';
export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER';
export const DISCONNECTED = 'DISCONNECTED';
export const CONNECT = 'CONNECT';
export const COMMAND = 'COMMAND';

export function connectToServer() {
  return {
    type: CONNECT,
    zmq: {}
  };
}

export function disconnectFromServer() {
  return {
    type: 'DISCONNECT',
    zmq: {}
  };
}

export function handshake() {
  return {
    type: COMMAND,
    zmq: {
      cmd: 'handshake'
    }
  };
}

export function startCpuProfiling() {
  return {
    type: COMMAND,
    zmq: {
      cmd: 'start_cpu_profiling'
    }
  };
}

export function stopCpuProfiling() {
  return {
    type: COMMAND,
    zmq: {
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

