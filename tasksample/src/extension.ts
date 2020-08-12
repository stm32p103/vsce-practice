import * as vscode from 'vscode';

const disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
  // TaskProviderの登録
  disposables.push( vscode.tasks.registerTaskProvider( taskType, new GreetingTaskProvider() ) );

  disposables.push( vscode.commands.registerCommand( 'execute-task', () => {
    vscode.tasks.executeTask( createGreetingTask( { type: taskType, message: 'from command.' } ) );
  } ) );
}

export function deactivate() {
  disposables.forEach( disposable => disposable.dispose() );
}

const taskType = 'greeting';  // package.json の taskDefinitions で設定した type であること
interface GreetingTaskDefinition extends vscode.TaskDefinition {
  type: typeof taskType;
  message: string;    // taskDefinitions の properties に登録したキーであること
}

function createGreetingTask( definition: GreetingTaskDefinition, name: string = '') {
  // Visual Studio Codeが実行するタスクの作成
  const task = new vscode.Task(
    definition,                       // 最低限タスクを識別するための type があれば良い
    vscode.TaskScope.Workspace,       // Global/Workspace...Globalは未対応の模様
    name,                             // name
    definition.type,                  // scope
                                      // Run Taks...での表示を決める。 scope: name となる。
    new vscode.ShellExecution( `echo ${definition.message} > greeting.txt` ), // 実行するコマンド
    []                                // エラー表示の整形(なし)
  );
  return task;
}

class GreetingTaskProvider implements vscode.TaskProvider {  
  provideTasks(): Thenable<vscode.Task[]> | undefined {
    console.log( 'provideTasks' );
    // 利用可能なタスクを返す。
    // Run Task...で一覧表示する度にコールされる。
    // 毎回生成し直す必要が無ければ、一度作成したものを保持して、要求されたときに返しても良い。
    return generateTasks();
  }

  resolveTask( task: vscode.Task ): vscode.Task | undefined {
    console.log( 'resolveTask' );
    // task.json で定義したタスク定義を受け取り、Visual Studio Codeが実行するタスクを作成する
    const definition: GreetingTaskDefinition = <any>task.definition;
    return createGreetingTask( definition );
  }
}

async function generateTasks(): Promise<vscode.Task[]> {
  const now = Date.now().toString();
  const tasks = [
    createGreetingTask( { type: taskType, message: 'Good morning.' }, 'morning' ),
    createGreetingTask( { type: taskType, message: 'Good evening.' }, 'evening' ),
    createGreetingTask( { type: taskType, message: now }, 'now' )
  ];
  return tasks;
}
