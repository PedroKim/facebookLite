class Api::FriendsController < ApplicationController
  def show
    @friend = Friend.find(7)
    render :show
  end

  def create
    @friend = Friend.new(friend_params)

    if @friend.save
      render :show
    else
      render @friend.errors.full_messages, status: 422
    end
  end

  def update
    @friend = Friend.find_by_requester_requestee_ids(
      friend_params[:requester_id],
      friend_params[:requestee_id]
    )

    if @friend.update_attributes(friend_params)
      render :show
    else
      render @friend.errors.full_messages, status: 422
    end
  end

  def destroy
    @friend = Friend.find_by_requester_requestee_ids(
      friend_params[:requester_id],
      friend_params[:requestee_id]
    )

    @friend.destroy

    render :show
  end

  private
  def friend_params
    params.require(:friend).permit(:requester_id, :requestee_id, :request_status)
  end
end