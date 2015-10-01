class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render json: {errors: @todo.errors.full_messages}
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    if @todo.destroy
      render json: @todo
    else
      render json: {errors: @todo.errors.full_messages}
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: {errors: @todo.errors.full_messages}
    end
  end

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end
