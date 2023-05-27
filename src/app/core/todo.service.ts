import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {
    this.onCreateSubscribeInit();
  }

  onCreate = new BehaviorSubject<any>(null);

  private onCreateSubscribeInit() {
    const query = `
    subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
      onCreateTodo(filter: $filter) {
        id
        name
        description
      }
    }
    `;

    // @ts-ignore
    API.graphql(graphqlOperation(query)).subscribe({
      next: (eventData: any) => {
        console.log('EVENT DATA : ', eventData);
        this.onCreate.next(eventData?.value?.data?.onCreateTodo);
      }
    });
  }

  async getAll() {
    const query = `
    query ListTodos(
      $filter: ModelTodoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          description
        }
        nextToken
      }
    }
    `;

    try {
      const result = await API.graphql<GraphQLQuery<any>>(
        { query, authMode: 'AMAZON_COGNITO_USER_POOLS' }
      )

      if (result.errors) throw result.errors

      return result.data.listTodos.items;
    } catch (err) {
      throw err;
    }

  }
}
