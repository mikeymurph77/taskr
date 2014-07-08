class TasksController < ApplicationController
	def index
		@task = Task.new
		@tasks = current_user.tasks.not_completed.order("created_at DESC")
	end

	def create
		@task = current_user.tasks.build(task_params)
		@tasks = current_user.tasks

		if request.xhr?
			if @task.save
				render @task
			end
		else
			# old & busted
			if @task.save
				redirect_to :tasks
			else
				render :index
			end
		end
	end

	private

	def task_params
		params.require(:task).permit(
			:title,
			:body,
		)
		
	end
end