Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update]
    resource :session, only: [:create, :destroy]
    resource :friends, only: [:show, :create, :update, :destroy]
  end

  root to: 'static_pages#root'
end
