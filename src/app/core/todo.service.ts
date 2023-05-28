import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {
    this.onCreateSubscribeInit();
    this.onDeleteSubscribeInit();
  }

  onCreate = new BehaviorSubject<any>(null);
  onDelete = new BehaviorSubject<any>(null);

  private onCreateSubscribeInit() {
    const query = /* GraphQL */ `
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
        console.log('ON CREATE EVENT DATA : ', eventData);
        this.onCreate.next(eventData?.value?.data?.onCreateTodo);
      }
    });
  }

  private onDeleteSubscribeInit() {
    const query = /* GraphQL */ `
      subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
        onDeleteTodo(filter: $filter) {
          id
          name
          description
          createdAt
          updatedAt
        }
      }
    `;

    // @ts-ignore
    API.graphql(graphqlOperation(query)).subscribe({
      next: (eventData: any) => {
        console.log('ON DELETE EVENT DATA : ', eventData);
        this.onDelete.next(eventData?.value?.data?.onDeleteTodo);
      }
    });
  }

  async getAll() {
    const query = /* GraphQL */ `
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

  async createTodo(todo: ITodo) {
    const query =  /* GraphQL */ `
      mutation CreateTodo(
        $input: CreateTodoInput!
        $condition: ModelTodoConditionInput
      ) {
        createTodo(input: $input, condition: $condition) {
          id
          name
          description
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const result = await API.graphql<GraphQLQuery<any>>(
        {
          query,
          variables: {
            input: todo
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        }
      )

      if (result.errors) throw result.errors

      return result;
    } catch (err) {
      throw err;
    }

  }

  async getTodo(todoId: string) {
    const query = /* GraphQL */ `
      query GetTodo($id: ID!) {
        getTodo(id: $id) {
          id
          name
          description
        }
      }
    `;

    try {
      const result = await API.graphql<GraphQLQuery<any>>(
        {
          query,
          variables: { id: todoId },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        }
      )

      if (result.errors) throw result.errors

      return result.data?.getTodo;
    } catch (err) {
      throw err;
    }

  }

  async deleteTodo(todoId: string) {
    const query = /* GraphQL */ `
      mutation DeleteTodo(
        $input: DeleteTodoInput!
        $condition: ModelTodoConditionInput
      ) {
        deleteTodo(input: $input, condition: $condition) {
          id
          name
          description
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const result = await API.graphql<GraphQLQuery<any>>(
        {
          query,
          variables: {
            input: { id: todoId }
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        }
      )

      if (result.errors) throw result.errors

      return result;
    } catch (err) {
      throw err;
    }

  }
}
