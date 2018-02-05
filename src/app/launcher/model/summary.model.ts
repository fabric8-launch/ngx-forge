import { Mission } from './mission.model';
import { Runtime } from './runtime.model';
import { Pipeline } from './pipeline.model';
import { Cluster } from './cluster.model';

export class Summary {
  applicationTitle?: string;
  cluster?: Cluster;
  groupId: string;
  mavenArtifact: string;
  mission: Mission;
  organization: string;
  pipeline: Pipeline;
  projectName: string;
  projectVersion: string;
  spacePath?: string;
  repository: string;
  runtime: Runtime;
  runtimeVersion: string;
  targetEnvironment: string;
}
