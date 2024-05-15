module ResponseConcern
  extend ActiveSupport::Concern

  def render_json(status, data = nil, errors = [])
    render json: {
      status:,
      data:,
      errors:
    }, status:
  end

  def render_json_paginated(status, data, page, next_page, total_pages)
    render json: {
      status:,
      page:,
      total_pages:,
      next_page:,
      data:
    }, status:
  end

  def id_param
    params.require(:id)
  end

  def pagination_params
    params.permit(:page)
  end
end
