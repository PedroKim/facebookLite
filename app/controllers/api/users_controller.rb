class Api::UsersController < ApplicationController
  def show
    @user = User.find_by(id: params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json:  @user.errors.messages[:password], status: 422
    end
  end

  def update
    update_params = params[:user]
    @user = User.find_by(id: update_params["id"])
    
    if update_params["col"].include?("img")
      @user.send(update_params["col"]).attach(update_params["val"])
    else
      @user[update_params["col"]] = update_params["val"]
    end

    if @user.save
      render :show
    else
      render json: @user.errors.messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :birth_date, :gender)
  end

  # def update_params
  #   params.require(:user).permit(:email, :password, :fname, :lname, :birth_date, :gender, :cover_img, :profile_img)
  # end
end
