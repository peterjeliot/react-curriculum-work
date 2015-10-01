Rails.application.routes.draw do
  get "api/todos/", to: "todos#index"
  get "api/todos/:id", to: "todos#show"
  post "api/todos/", to: "todos#create"
  delete "api/todos/:id", to: "todos#destroy"
  patch "api/todos/:id", to: "todos#update"
end
